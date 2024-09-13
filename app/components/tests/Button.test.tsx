import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from "app/components"

test('renders correctly', () => {
    const tree = renderer.create(<Button text="test"/>).toJSON();
    expect(tree).toMatchSnapshot();
})