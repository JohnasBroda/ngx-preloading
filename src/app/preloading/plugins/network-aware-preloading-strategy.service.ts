import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { PreloadingStrategyPlugin } from '../utils';
import {
  PRELOADING_GUARD,
  PRELOADING_CONFIG,
  NAVIGATOR,
  NETWORK_AWARE_PRELOADING_CHECK,
  CONNECTION_TYPE_BLACKLIST,
  EFFECTIVE_CONNECTION_TYPE_BLACKLIST
} from '../tokens';
import { PreloadingGuard } from '../guards';
import { IPreloadingConfig, IRoutePreloadingConfig } from '../interfaces';
import { PreloadingCheck, BlacklistHandlingStrategy } from '../types';
import { Route } from '@angular/router';
import { WithRouteConfig } from '../decorators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class NetworkAwarePreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'Network aware strategy';

  private get connection(): NetworkInformation {
    return this.navigator && this.navigator['connection']
        || this.navigator['mozConnection'] as NetworkInformation
        || this.navigator['webkitConnection'] as NetworkInformation;
  }

  private get connectionType(): ConnectionType | null {
    return !!this.connection && this.connection.type || null;
  }

  private get effectiveConnectionType(): EffectiveConnectionType | null {
    return !!this.connection && this.connection.effectiveType || null;
  }

  private get defaultPreloadingCheck(): PreloadingCheck {
    return (_route: Route, config: IRoutePreloadingConfig) => {
      if (!config || !this.connection || this.connection.saveData) {
        return false;
      }

      const effectiveType = this.connection.effectiveType || '' as EffectiveConnectionType;
      const connectionType = this.connection.type || '' as ConnectionType;

      const {
        connectionTypeBlacklist,
        effectiveConnectionTypeBlacklist,
        connectionTypeBlacklistHandlingStrategy,
        effectiveConnectionTypeBlacklistHandlingStrategy,
      } = config;

      const applicableEffectiveTypeBlacklist = this.getApplicableEffectiveTypeBlacklist(
        effectiveConnectionTypeBlacklist,
        effectiveConnectionTypeBlacklistHandlingStrategy
      );

      const applicableConnectionTypeBlacklist = this.getApplicableConnectionTypeBlacklist(
        connectionTypeBlacklist,
        connectionTypeBlacklistHandlingStrategy
      );

      const isEffectiveTypeValid = applicableEffectiveTypeBlacklist.includes(effectiveType) === false;
      const isConnTypeValid = applicableConnectionTypeBlacklist.includes(connectionType) === false;

      if (!isEffectiveTypeValid || !isConnTypeValid) {
        return combineLatest([
          this.connectionType$,
          this.effectiveConnectionType$
        ]).pipe(
          map(types => {
            const connType = types[0] as unknown as ConnectionType;
            const effectiveConnType = types[1] as EffectiveConnectionType;

            return applicableConnectionTypeBlacklist.includes(connType) === false
                && applicableEffectiveTypeBlacklist.includes(effectiveConnType) === false;
          })
        );
      }

      return true;
    };
  }

  private get preloadingCheck(): PreloadingCheck {
    return this.customPreloadingCheck || this.defaultPreloadingCheck;
  }

  private readonly connectionType$ = new BehaviorSubject<ConnectionType>(this.connectionType);
  private readonly effectiveConnectionType$ = new BehaviorSubject(this.effectiveConnectionType);

  constructor(
    public injector: Injector,
    @Inject(NAVIGATOR)
    private navigator: Navigator,
    @Inject(PRELOADING_GUARD)
    public preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG)
    public preloadingConfig: IPreloadingConfig,
    @Inject(EFFECTIVE_CONNECTION_TYPE_BLACKLIST)
    private effectiveConnectionTypeBlacklist: EffectiveConnectionType[],
    @Inject(CONNECTION_TYPE_BLACKLIST)
    private connectionTypeBlacklist: ConnectionType[],
    @Optional() @Inject(NETWORK_AWARE_PRELOADING_CHECK)
    private customPreloadingCheck: PreloadingCheck,
  ) {
    super();
    this.setUpStreams();
  }

  @WithRouteConfig()
  public supports(_route: Route, config: IRoutePreloadingConfig): boolean {
    return !!config && !!config['networkAwarePreload'];
  }

  @WithRouteConfig()
  public shouldPreload(route: Route, config: IRoutePreloadingConfig): boolean {
    return this.preloadingCheck.call(route, config);
  }

  private setUpStreams(): void {
    this.connection.addEventListener('change', () => {
      this.connectionType$.next(this.connectionType);
      this.effectiveConnectionType$.next(this.effectiveConnectionType);
    });
  }

  private getApplicableEffectiveTypeBlacklist(
    configuredBlackList: EffectiveConnectionType[],
    strategy: BlacklistHandlingStrategy
  ): EffectiveConnectionType[] {
    return this.mergeBlacklists(
      this.effectiveConnectionTypeBlacklist,
      configuredBlackList,
      strategy
    );
  }

  private getApplicableConnectionTypeBlacklist(
    configuredBlackList: ConnectionType[],
    strategy: BlacklistHandlingStrategy
  ) {
    return this.mergeBlacklists(
      this.connectionTypeBlacklist,
      configuredBlackList,
      strategy
    );
  }

  private mergeBlacklists<T extends any[]>(
    defaultBlackList: T,
    configuredBlackList: T,
    strategy: BlacklistHandlingStrategy
  ): T {
    if (!configuredBlackList) {
      return defaultBlackList;
    }

    return strategy === 'merge'
      ? [ ...defaultBlackList, ...configuredBlackList ] as T
      : configuredBlackList as T;
  }
}
