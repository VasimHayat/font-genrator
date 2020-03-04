# font-genrator

Genrate the font from Svg files and use like font-awesome

# build font

npm run build

# run

npm run start

# metadata.json

      {
        "fontName": "myfont",
        "iconPath": "svg",
        "fontDestination": "fonts",
        "fontClasses": [
            {
            "name": "fg-home",
            "unicode": "\uE001"
            },
            {
            "name": "fg-dashboard",
            "unicode": "\uE002"
            },
            {
            "name": "fg-task",
            "unicode": "\uE003"
            }
        ]
        }

    #fontName - Folder Name for resource svg, and this name is also used as your *font Name*

    #iconPath - Folder Path for svg resources
        example if icon path name is *svg* and your font name is *myFont* then
        your svg resource file strature look like this *svg/myfont*

    #fontDestination - font destination path

    #fontClasses -

        #name - name of svg file example: fg-home.svg  and font will be genrated
        with same name like .fg-home:before{content:'/xyz'}

        #unicode - unique unicode value for your svg/font
