import {
  IntentCtx,
  RenderConfigScreenCtx,
  RenderPageCtx,
  connect,
} from 'datocms-plugin-sdk';

import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import 'datocms-react-ui/styles.css';
import Release from './entrypoints/pages/Release';

enum PageId {
  Release = 'release',
}

connect({
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    return render(<ConfigScreen ctx={ctx} />);
  },

  renderPage(pageId: string, ctx: RenderPageCtx) {
    switch (pageId) {
      case PageId.Release:
        return render(<Release ctx={ctx} />);
    }
  },

  mainNavigationTabs(ctx: IntentCtx) {
    return [
      {
        label: 'Release',
        icon: 'starship',
        pointsTo: {
          pageId: PageId.Release,
        },
      },
    ];
  },
});
