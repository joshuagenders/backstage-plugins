import { EntityProvider } from '@backstage/plugin-catalog-react'
import { Entity } from '@backstage/catalog-model'
import React from 'react'
import { EntityValueComponent } from '.'
import { render } from '@testing-library/react'

describe('EntityValueComponent', () => {
    it('should return root level values', () => {
        const rendered = render(
            <EntityProvider entity={{ kind: 'component' } as Entity}>
                <EntityValueComponent path='kind' />
            </EntityProvider>
          )
      
          expect(rendered.queryByText('component')).toBeInTheDocument()
    })
    it('should return nested values', () => {
        const rendered = render(
            <EntityProvider entity={{ metadata:{ name: 'componentname'} } as Entity}>
                <EntityValueComponent path='metadata.name' />
            </EntityProvider>
          )
      
          expect(rendered.queryByText('componentname')).toBeInTheDocument()
    })
})