# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
# pin "three" # @0.162.0
# pin "three/addons", to: "three--addons.js" # @0.162.0

pin "three", to: "https://ga.jspm.io/npm:three@0.162.0/build/three.module.js" # @0.162.0
# pin "three/addons", to: "https://ga.jspm.io/npm:three@0.162.0/examples/jsm/Addons.js"
pin "three/orbit", to: "https://ga.jspm.io/npm:three@0.162.0/examples/jsm/controls/OrbitControls.js"