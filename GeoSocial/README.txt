#Git bug? Non aggiorna più il contenuto della cartella '.meteor'
#Copiare e sovrascrivere il contenuto di questo file nel file 'packages' in '.meteor/packages'

#--------------------------------------------------------------------

# Meteor packages used by this project, one per line.
# Check this file (and the other files in this directory) into your repository.
#
# 'meteor add' and 'meteor remove' will edit this file for you,
# but you can also edit it by hand.

meteor-base             # Packages every Meteor app needs to have
mobile-experience       # Packages for a great mobile UX
mongo                   # The database Meteor supports right now
blaze-html-templates    # Compile .html files into Meteor Blaze views
session                 # Client-side reactive dictionary for your app
jquery                  # Helpful client-side library
tracker                 # Meteor's client-side reactive programming library

standard-minifiers      # JS/CSS minifiers run for production mode
es5-shim                # ECMAScript 5 compatibility for older browsers.
ecmascript              # Enable ECMAScript2015+ syntax in app code

iron:router
sacha:spin
accounts-password

meteortoys:allthings
u2622:persistent-session
aldeed:collection2

twbs:bootstrap
rajit:bootstrap3-datepicker-en-gb
peppelg:bootstrap-3-modal
verron:autosize

dburles:google-maps
mdg:geolocation
jeremy:geocomplete

momentjs:moment