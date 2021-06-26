export class PSWindow extends FormApplication {
    //Class constructor
    constructor() {
        super();
        this.actorIdList = game.settings.get("party-sheet", "actorsIdListSettings");
        //this.template_data; //the data needed to build the display
    }

    //default options for the form
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          height: 400,
          width: 800,
          popOut: true,
          template: `modules/party-sheet/html-templates/ps-template.html`,
          id: 'party-sheet-application',
          title: 'Party Sheet',
          dragDrop: [{callbacks: {dragstart: this._onDragStart, drop: this._onDrop}}]
        });
    }

    //build the data needed to render the form
    getData(options = {}) {
        let template_data = [];
        this.actorIdList.forEach(id => {
            template_data.push({
                id: id,
                name: game.actors.get(id).data.name,
                str: game.actors.get(id).data.data.abilities["str"].value,
                dex: game.actors.get(id).data.data.abilities["dex"].value,
                con: game.actors.get(id).data.data.abilities["con"].value,
                int: game.actors.get(id).data.data.abilities["int"].value,
                wis: game.actors.get(id).data.data.abilities["wis"].value,
                cha: game.actors.get(id).data.data.abilities["cha"].value
            })
        });
        return template_data;
    }
    
    //what happens when we drag an actor on the form
    async _onDrop(event) {
        //try to extract the data from the event
        let dropData;
        try {
            dropData = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            return false;
        }
        
        if (dropData["type"] !== "Actor") {
            console.log("Error: need an Actor type");
            return;
        } else if (game.actors.get(dropData["id"]).data.type === "character"){
            if (this.actorIdList.find(e => e === dropData["id"] )) {
                console.log("Already in array");
                return;
            } else {
                this.actorIdList.push(dropData["id"]);
                game.settings.set("party-sheet", "actorsIdListSettings", this.actorIdList);
                this.render();
            } 
            //console.log(this.actorIdList); 
        } else {
            console.log("Error: we need an actor of type character");
            return;
        }
    }
}