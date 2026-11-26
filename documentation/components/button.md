# Button

<figure><picture><source srcset="../.gitbook/assets/Button Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Button Light.png" alt=""></picture><figcaption></figcaption></figure>

For most glassy components, a button component would be used. Either to hold one icon depicting what action clicking it will do, or multiple icons to group related actions together in a unified space that can easily be found. Usually, accompanied by placing button(s) in the top left, top right, bottom left, or bottom right corners of the viewport.

The image above is as follows:

```vue-html
<body>
    <nav>
        <div.BL>
            <div.glassy.button>
                <svg>...</svg>
                <svg>...</svg>
            </div>
            <div.glassy.button.tinted>
                <svg>...</svg>
            </div>
        </div>
    <nav>
</body>
```

### Tinting

For more important buttons, you can apply a tint with the `tinted` class, allowing prominence for a specific action. Icons and text inside a tinted element will automatically have color treatment.

```vue-html
<div.glassy.button.tinted>
    <svg>...</svg>
    <p>...</p>
</div>
```

### Position

To have a button class tied to a corner, use `.TL`, `.TR`, `.BL`, or `.BR` to a div. Usually, these items would be put inside a `nav` element. Padding below will automatically be accounted for.

```vue-html
<body>
    <nav>
        <div.BL>...</div>
    <nav>
</body>
```

<figure><img src="../.gitbook/assets/Button iOS26.png" alt=""><figcaption><p>Source: Apple</p></figcaption></figure>
