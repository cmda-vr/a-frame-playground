# Building a basic scene
* Script tag begore a-scene because it registers custom elements on the HTML
* `a-scene` wil handle all the setup of the 3d scene
* Within the scene you attach entities
* Primitives are a-frames easy to use HTML components that wrap the underlying entity
* Entities are placed on default camera origin positions

## 3D space
* right handed coordinate system
* distance unit is meters because webvr API returns meters
* rotational unit is in degrees

## Parent and child transforms
* Entities can have a single parent and multiple children. Child entities inherit transforms
* position is in meters
* default color scheme let people experience VR without headset
* with goggles you are entering VR  

## Assets
* a-frame recommends to use the assets manager
* reuse texture for multiple entities
* You can add plane for a ground negative on the x axis you can also repeat it

## Lights
* By default a-frame already does a bit of ambient lighting

## Animations
* Interpolate or tween values over time
* It hooks into a-frames render loop so only called once every animation