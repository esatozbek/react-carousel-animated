# React Animated Carousel

Yet another implementation of a carousel component for React. Powered with react-spring animations!

## Installation

```bash
npm install react-animated-carousel
```

```bash
yarn add react-animated-carousel
```

## Usage

```javascript
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel";
import "react-carousel/dist/ReactCarousel.cjs.css";

<div className="container">
    <ReactCarousel
        carouselConfig={{
            transform: {
                rotateY: {
                    [BEFORE]: () => "rotateY(25deg)",
                    [CENTER]: () => "rotateY(0deg)",
                    [AFTER]: () => "rotateY(-25deg)",
                },
            },
        }}
        containerStyle={{
            padding: "50px 0",
        }}
        itemBackgroundStyle={{
            backgroundColor: "#ece4db",
            borderRadius: "3px",
            boxShadow: "8px 12px 14px -6px black",
        }}
        containerBackgroundStyle={{
            filter: "blur(7px)",
            backgroundColor: "rgba(62, 212, 214, 0.3)",
        }}
        itemMaxWidth={50}
        carouselHeight={500}
    >
        {images[0].map((image, index) => (
            <img
                key={index}
                src={image.src}
                alt="test"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                    margin: "1rem",
                }}
            />
        ))}
    </ReactCarousel>
</div>;
```

## Props

### carouselConfig

Config object for carousel animations. Default is:

```javascript
{
    transform: {
        rotateY: {
            [AFTER]: () => "rotateY(-55deg)",
            [CENTER]: () => "rotateY(0deg)",
            [BEFORE]: () => "rotateY(55deg)",
        },
        translateX: {
            [AFTER]: () => "translateX(0%)",
            [CENTER]: () => "translateX(-50%)",
            [BEFORE]: () => "translateX(0%)",
        },
        translateY: {
            [AFTER]: () => "translateY(-50%)",
            [CENTER]: () => "translateY(-50%)",
            [BEFORE]: () => "translateY(-50%)",
        },
    },
    zIndex: {
        [AFTER]: () => 1,
        [CENTER]: () => 0,
        [BEFORE]: () => 1,
    },
    left: {
        [AFTER]: (containerWidth, diff) => `${(containerWidth * -diff * 9) / 10}px`,
        [CENTER]: (containerWidth) => `${containerWidth / 2}px`,
        [BEFORE]: (containerWidth, diff, imageWidth) =>
            `${imageWidth * (-diff * 2 + 1) + containerWidth / 10}px`,
    },
    filter: {
        brightness: {
            [AFTER]: () => "brightness(0.32)",
            [CENTER]: () => "brightness(1)",
            [BEFORE]: () => "brightness(0.32)",
        }
    },
}
```

If you just want to disable some animation properties, just override them with false value:

```javascript
carouselConfig={{
    transform: {
        rotateY: false
    },
}}
```

All other values will be inhereted from default values. Also, if you want to override some values, you can send a object with BEFORE, CENTER, AFTER function properties. These are indicating item's position and will be called with containerWidth, diff, imageWidth values.

```javascript
carouselConfig={{
    transform: {
        rotateY: {
                [AFTER]: () => "rotateY(3deg)",
                [CENTER]: () => "rotateY(3deg)",
                [BEFORE]: () => "rotateY(3deg)",
        }
    },
}}
```

Again, other default properties will be used from default component. If you want to disable them all, config object should be look like this:

```javascript
{
    transform: false,
    zIndex: false,
    left: false,
    top: false,
    filter: false,
}
```

### springConfig

React Spring libraries config object. Their web site can be visited for detailed information. Default value is:

```javascript
{
    mass: 2,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.001,
}
```

### containerStyle

Style object for carousel container.

### containerBackgroundStyle

Style object for carousel container's background, which is a absolute positioned element to wrap background.

### itemBackgroundStyle

Style object for carousel item's background element, which is container for react-spring animations and items.

### carouselHeight

Height property carousel container. Since all items are absolute positioned, this value must be provided.

### showIndices

Will show index component. Default is false.
