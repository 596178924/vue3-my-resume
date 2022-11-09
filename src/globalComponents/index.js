import Button from "./Button"
import Space from "./Space"
import Hr from "./Hr"
import Image from "./Image"
import Card from "./Card"
import AudioPlayer from "./AudioPlayer"
import Scrollbar from "./Scrollbar"


export function setupInstallGlobalComponents(app) {
    app.component('mlButton', Button)
    app.component('mlSpace', Space)
    app.component('mllHr', Hr)
    app.component('mImage', Image)
    app.component('mlCard', Card)
    app.component('AudioPlayer', AudioPlayer)
    app.component('mlScrollbar', Scrollbar)

    // app.component('mPlace', Place)
    // app.component('mPlaceItem', PlaceItem)
}
