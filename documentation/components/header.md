# Header

<figure><picture><source srcset="../.gitbook/assets/Header Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Header Light.png" alt=""></picture><figcaption></figcaption></figure>

To both make reachability for content easier on taller devices, and to give a clear definition of where the user is, a header can be used at the beginning of a section to account for both.

```vue-html
<body>
    <header>
        <h1>Header</h1>
    </header>
</body>
```

If you have multiple [sections](section.md), each one can have their own header. Here, we hide the second section and can be shown (while hiding the first section) using custom javascript later on, probably using a [tab bar](tab-bar.md).

```vue-html
<body>
    <section>
        <header>
            <h1>Section 1</h1>
        </header>
    </section>
    
    <section.removed>
        <header>
            <h1>Section 2</h1>
        </header>
    </section>
</body>
```
