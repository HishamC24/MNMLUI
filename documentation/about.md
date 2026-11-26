---
description: How did we get here?
---

# About

Apple introduced Liquid Glass in iOS26, and subtly also changed the design of all buttons and interactable items, having them separated from the edges of the screen, floating above the main content below the page. All buttons now have their own dedicated spot.

<figure><img src=".gitbook/assets/BeforeAfter iOS26.jpg" alt=""><figcaption></figcaption></figure>

Samsung later on introduced floating components and tab bar as well, close in design to iOS26.

OneUI8:&#x20;

<figure><img src=".gitbook/assets/OneUI8 Tab Bar.png" alt=""><figcaption></figcaption></figure>

iOS26:&#x20;

<figure><img src=".gitbook/assets/iOS26 Tab Bar.png" alt=""><figcaption></figcaption></figure>

And then a thought appeared: "What if I make my own rendition of this floating tab bar design for my own work?" This started the foundation of MNMLUI.

[NewGenUI](https://lightslicergp.github.io/NewGenUI/) is my first test of this, finding the right spacing and designing the tab bar to adapt to multiple items. While it is okay, there is much room to be desired. [The playground within the site](https://lightslicergp.github.io/NewGenUI/TestPlayground/) came later, where the idea of having a simple importable CDN started coming to mind.

After some time, I created MNMLUI, bringing in the code from the NewGenUI Playground to start off, having a usable floating tab bar, and a single importable .js line. Later, I extracted the glassy material styles into its own file if a user only wanted to have just the styles, so they can import a single .css file.
