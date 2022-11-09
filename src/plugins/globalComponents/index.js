import Button from "@gc/Button"
import Space from "@gc/Space"
import mlHr from "@gc/Hr"
import Image from "@gc/Image"
import Card from "@gc/Card"
import AudioPlayer from "@gc/AudioPlayer"
import Scrollbar from "@gc/Scrollbar"

// import Place from "@gc/Place"
// import PlaceItem from "@gc/Place/item"

export function setupInstallGlobalComponents(app) {
    app.component('mlButton', Button)
    app.component('mlSpace', Space)
    app.component('mlHr', mlHr)
    app.component('mlImage', Image)
    app.component('mlCard', Card)
    app.component('AudioPlayer', AudioPlayer)
    app.component('mScrollbar', Scrollbar)

    // app.component('mPlace', Place)
    // app.component('mPlaceItem', PlaceItem)
}
