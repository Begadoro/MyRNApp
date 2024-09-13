import React from 'react';
import renderer from 'react-test-renderer';
import { ItemSquare } from "app/components"
import { ProductFromAPI } from "app/services/api"

const product: ProductFromAPI = {
    id: 1,
    title: "Product 1",
    image: "https://via.placeholder.com/150",
}

test('renders correctly', () => {
    const tree : any = renderer.create(<ItemSquare product={product}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('is a view', () => {
    const tree : any = renderer.create(<ItemSquare product={product}/>).toJSON();
    expect(tree.type).toBe("View");
})