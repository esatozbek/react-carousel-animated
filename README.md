# React Carousel Animated

Yet another implementation of a carousel component for React. This one is enchanced with react-spring animations!

## Installation

```bash
npm install react-carousel-animated
```

```bash
yarn add react-carousel-animated
```

[Codesandbox demo](https://codesandbox.io/s/react-carousel-animated-demo-35ic3)

## Usage

```jsx
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";
import "react-carousel-animated/dist/style.css";

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
    itemBackgroundStyle={{
        backgroundColor: "#ece4db",
        borderRadius: "3px",
        boxShadow: "8px 12px 14px -6px black",
    }}
    containerBackgroundStyle={{
        filter: "blur(7px)",
        backgroundColor: "rgba(62, 212, 214, 0.3)",
    }}
    carouselHeight="600px"
>
    {images.map((image, index) => (
        <img
            key={index}
            src={image.src}
            alt="test"
            style={{
                height: "500px",
                borderRadius: "20px",
                boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                margin: "1rem",
            }}
        />
    ))}
</ReactCarousel>;
```

## Props

### carouselConfig

Config object for carousel animations. Default animation properties are:

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

Every animation property is a object with BEFORE, CENTER and AFTER properties. These properties are indicating position of component. BEFORE is left hand side of carousel, AFTER is right hand side of carousel and CENTER is center position of carousel.
CSS properties which takes multiple arguments are represented with nested objects, like transform property above.

To disable some animation properties, false value can be used:

```javascript
carouselConfig={{
    transform: {
        rotateY: false
    },
}}
```

All other values which are not presented in config object will be inhereted from default animation properties.

To override animation properties, an object with BEFORE, CENTER, AFTER properties should be set to value. These properties are a function that takes 3 arguments: containerWidth, diff, imageWidth.

```javascript
carouselConfig={{
    transform: {
        rotateY: {
                [AFTER]: (containerWidth, diff, imageWidth) => "rotateY(3deg)",
                [CENTER]: (containerWidth, diff, imageWidth) => "rotateY(3deg)",
                [BEFORE]: (containerWidth, diff, imageWidth) => "rotateY(3deg)",
        }
    },
}}
```

A config object which disables all animation properties:

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

Style object for carousel item's background element, which is container for react-spring animations.

### carouselHeight

Height property carousel container. Since all items are absolute positioned, this value must be provided.

### showIndices

Will show index component. Default is false.
