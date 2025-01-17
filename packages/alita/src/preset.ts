import { logger } from '@umijs/utils';
import type { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    logger.info('Hello Alita@3');
  });
  const plugins = [
    require.resolve('./features/config/alitaconfig'),
    require.resolve('./features/alitaloading'),
    require.resolve('./features/apptype'),
    require.resolve('./features/qrcodeterminal'),
    require.resolve('./commands/generate/pages'),
    require.resolve('@alita/plugins/dist/aconsole'),
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
    require.resolve('@alita/plugins/dist/mainpath'),
    require.resolve('@alita/plugins/dist/request'),
    require.resolve('@alita/plugins/dist/dva'),
    require.resolve('@alita/plugins/dist/classnames'),
    require.resolve('@alita/plugins/dist/model'),
  ];
  if (api.userConfig.antd) {
    plugins.push(require.resolve('@alita/plugins/dist/antd'));
  }
  if (api.userConfig.appType === 'native') {
    plugins.push(require.resolve('@alita/native'));
  }
  if (api.userConfig.appType !== 'pc') {
    plugins.push(require.resolve('@alita/plugins/dist/hd'));
    plugins.push(require.resolve('@alita/plugins/dist/antdmobile'));
    plugins.push(require.resolve('@alita/plugins/dist/mobile-layout'));
  }
  // docs 暂时不做任何操作，后续可加插件和组件
  if (api.userConfig.appType === 'docs') {
    return {
      plugins: [require.resolve('./features/apptype')],
    };
  }
  return {
    plugins,
  };
};
