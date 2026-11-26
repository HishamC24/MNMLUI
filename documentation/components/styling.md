# Styling

<figure><picture><source srcset="../.gitbook/assets/Styling Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Styling Light.png" alt=""></picture><figcaption></figcaption></figure>

With a nod to Glassmorphism, MNMLUI starts with a foundation of a metamaterial that many people have seen before: Frosted Glass. With a translucent color and background blur, the material allows content behind it to be shown through, while being able to host content of its own.

### Shadows

One issue that is addressed with glass-like materials is the inability to see the content on the glass, and this is where the CDN allows `.glassy` components to have dynamic shadows. In light mode, if the content behind a glassy component is busy or too high in brightness, the glassy item will have a darker drop shadow to separate from content below even more. On already contrasty areas, like a darker background, the drop shadow is reduced to clean up the viewport and decrease busyness on the screen.

### Interactive Animation Sizing

When applying glassy to an element, on tap the element will react by expanding in size. Apply `.sc-m` to medium-sized objects and `.sc-l` to larger objects to have them react less extremely on interaction.

### Remove Shadows

If you want a glassy item to not have a shadow, use the `.shadowless` class.

### Tinting

For a tinted glassy item with the accent color, use `.tinted` to apply the accent color to the entire element.

### Clearer and Clear

For more clearer glassy elements, use the `.clearer` class to have a more transparent look. Same goes for `.clear`, which gives the element only highlights and the background blur, but no color.

### Permenantly Light or Dark

If you want an item to be permenantly light or permenantly dark, use `.permLight` or `.permDark` respectively.
