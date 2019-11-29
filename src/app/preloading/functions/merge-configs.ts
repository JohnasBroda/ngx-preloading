import { IPreloadingConfig } from '../interfaces';


export function mergeConfigs(
    either: IPreloadingConfig,
    other: IPreloadingConfig
): IPreloadingConfig {
    return {
        ...(!!either ? either : {}),
        ...(!!other ? other : {}),
        pluginConfigs: either.pluginConfigs.reduce((acc, curr) => {
            const pluginName = curr.plugin.toString();

            const otherConfig = other.pluginConfigs.find(
                config => config.plugin.toString() === pluginName
            );

            acc.push({
                ...curr,
                ...otherConfig
            });

            return acc;
        }, []),
    };
}
