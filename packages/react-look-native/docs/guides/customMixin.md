# Build your own: Mixin

A mixin basically it is just a plain function that either returns an object containing styles that get added to the element's styles or directly modifies components passed by the  interface.

## Interface
As you most likely need some more information to evaluate properly, Look provides an interface that includes lots of informations.

| Property |Type |Description |
| -------- | ----------- | ---|
| Component | *object*|React Component wrapped with look |
|element |*object* |element that gets the styles applied |
| newProps | *object* |element's new props after enhancing |
| config | *object* |Look configuration |
|styles |*object* |whole style object |
|mixinKey | *string* |key used to register the mixin |
|property | *string* |property used in styles |
| value | *any* |value applied to the property |

> The components are the same passed to plugins except mixinKey, property and value.

#### mixinKey vs. property
You might wonder which one to use. They seem to have the same value unless you allow expressions to be passed. <br>
For example the [substr](../Mixins.md#substr) mixin allowed an regex passed. `substr([a-z])` would return `substr` as **mixinKey** and `substr([a-z])` as **property**.

#### `_lookShouldUpdate`
Look also provides a special hook which can be used to force element cloning.
```javascript
const mixin = ({ newProps }) => {
	// forces Look to clone the element
	newProps._lookShouldUpdate = true
}
```
