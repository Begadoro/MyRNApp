import React from "react"
import renderer from 'react-test-renderer';
import { Loader } from "app/components"

test('renders correctly', () => {
    const tree = renderer.create(<Loader isLoading={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('it is displayed when prop is true', () => {
    const tree : any = renderer.create(<Loader isLoading={true}/>).toJSON();
    expect(tree.props.style[0].display).toBe("flex");
})

test('it is not displayed when prop is false', () => {
    const tree : any = renderer.create(<Loader isLoading={false}/>).toJSON();
    expect(tree.props.style[0].display).toBe("none");
})

