import React from 'react';
import { Navigate, Route } from 'react-router';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
  EntityAboutCard,
} from '@backstage/plugin-catalog';
import { CatalogImportPage } from '@backstage/plugin-catalog-import';
import { EntityMembersListCard, EntityOwnershipCard, EntityUserProfileCard, orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';
import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { EntityValue, MyPage, ComponentConfig } from '@internal/plugin-my-page';

const app = createApp({
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {});
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const schema: ComponentConfig[] =
[
  { id: 'EntityValue', formInputs: [{ name: 'EntityValue', displayName: 'JSON Path', required: true, type: 'string', description: 'JSON path value to apply to Entity' }] },
  { id: 'EntityUserProfileCard', requiresEntity: true },
  { id: 'EntityOwnershipCard', requiresEntity: true },
  { id: 'EntityMembersListCard', requiresEntity: true },
  { id: 'EntityAboutCard', requiresEntity: true }
]

const componentFactory = (id: string, props: {[key: string]:string}) => {
  switch (id) {
    case 'EntityValue':
      return <EntityValue path={props && 'key' in props ? props.key : 'metadata.name'} />;
    case 'EntityType':
      return <EntityValue path="spec.type" />;
    case 'EntityUserProfileCard':
      return <EntityUserProfileCard variant="gridItem" />
    case 'EntityOwnershipCard':
      return <EntityOwnershipCard variant="gridItem" />
    case 'EntityMembersListCard':
      return <EntityMembersListCard />
    case 'EntityAboutCard':
        return <EntityAboutCard />
  
    default:
      return <></>;
  }
};

const routes = (
  <FlatRoutes>
    <Navigate key="/" to="catalog" />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/catalog-import" element={<CatalogImportPage />} />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route
      path="/my-page"
      element={<MyPage componentFactory={componentFactory} schema={schema} />}
    />
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default App;
