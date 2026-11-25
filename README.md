![MNMLUI](/ETC/Images/MNMLUI%20Logo%206.4.26.png)

# MNMLUI

A CDN That allows any website to use the Minimal UI software ecosystem.

Import via this one line:

```html
<script src="https://hishamc24.github.io/MNMLUI/MNMLUI.js"></script>
```

If you want just the styling, import that one stylesheet. No longer reccomended since it does NOT have the dynamically adjusting drop shadow:

```html
<link rel="stylesheet" href="https://hishamc24.github.io/MNMLUI/CSS/Styles.css" />
```

also, to have an accent color, in your `:root` set `--MNMLUI-ACCENT` to a hex value, like so:

```css
:root {
  --MNMLUI-ACCENT: #ff0080;
}
```

Example Components and their usage can be found inside `/HTML/`

## How did we get here?

MNMLUI Is a unified design language that is meant to bring together the best parts of both iOS(26+) and OneUI(8+) together.

Apple introduced Liquid Glass in iOS26, and subtly also changed the design of all buttons and interactable items, having them seperated from the edges of the screen, floating above the main content below the page. All buttons now have their own dedicated spot.

<img src="./ETC/Images/BeforeAfter%20iOS26.jpg" style="border-radius: 32px; max-width: 100%;" />

Samsung later on introduced floating components and tab bar as well, close in design to iOS26.

OneUI8:
<img src="./ETC/Images/OneUI8%20Tab%20Bar.png" style="border-radius: 128px; max-width: 100%;" />

iOS26:
<img src="./ETC/Images/iOS26%20Tab%20Bar.png" style="border-radius: 128px; max-width: 100%;" />

And then a thought appeared: "What if I make my own rendition of this floating tab bar design for my own work?" This started the foundation of MNMLUI.

[NewGenUI](https://lightslicergp.github.io/NewGenUI/) is my first test of this, finding the right spacing and designing the tab bar to adapt to multiple items. While it is okay, there is much room to be desired. [The playground within the site](https://lightslicergp.github.io/NewGenUI/TestPlayground/) came later, where the idea of having a simple importable CDN started coming to my mind.

After some time I created MNMLUI, bringing in the code from the NewGenUI Playground to start off, having a useable floating tab bar, and a single .js importable line. Later, I extracted the glassy material styles into its own file if a user only wanted to have just the styles, so they can import a single .css file.

### Styling

MNMLUI starts with a foundation of a metamaterial that many people have seen before: Frosted Glass. With a transluscent color and background blur, the material allows content behind it to be shown through, while being able to host content of its own.

### Section

When having multiple related pages within one site or app, sections should be used to seperate distinct yet related parts of content.

### Tab Bar

A main way to pageify content is to use a tab bar. Where a user will focus on one page at a time, a tab bar allows them to know what section they are in, and what content might be inside.

### Header

To both make reachability for content easier on taller devices, and to give a clear defenition of where the user is, a header can be used at the beginning of a section to account for both.

### Button

For most glassy componenets, a button component would be used. Either to hold one icon depicting what action clicking that will do, or multiple to group related actions together in a unified space that can easily be found. Usually, accompanied by putting button(s) into the top left, top right, bottom left, or bottom right corners of the viewport.

### Card

To contain and group content in a section, cards are used. Usually to hold interactable components, text, or even images.