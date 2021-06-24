import { PartySheetApp } from "./partysheet.js"

 // window.MyFormApplication = MyFormApplication;


//PartySheet class
class PartySheet {
  static openPartySheet = () => {
    //const html = await renderTemplate("modules/party-sheet/scripts/myFormApplication.html");
    let data = PartySheet.prepareData();
    /*const template_file = "modules/party-sheet/html-templates/test_template.html";
    const template_data = {
      str: data["str"].value,
      dex: data["dex"].value,
      con: data["con"].value,
      int: data["int"].value,
      wis: data["wis"].value,
      cha: data["cha"].value
    };
    /*const template_file = "modules/party-sheet/html-templates/test2.html";
    const template_data = {
      test: "tototata"
    };
    console.log(template_data);
    new PartySheetApp(template_data, {template: template_file}).render(true);*/
    const template_file = "modules/party-sheet/html-templates/test_template.html";
    let template_data;
    let rendered_html;
    let mon_html = "<form>"
    for (let i = 0;i < data.length;i++) {
      //console.log(data[i]);
      template_data = {
      str: data[i]["str"].value,
      dex: data[i]["dex"].value,
      con: data[i]["con"].value,
      int: data[i]["int"].value,
      wis: data[i]["wis"].value,
      cha: data[i]["cha"].value
    };
    //console.log(template_data);
    rendered_html = renderTemplate(template_file,template_data);
    //console.log(rendered_html);
    mon_html +=rendered_html.toString();
    }
    mon_html += "</form>";
    console.log(mon_html);
    new PartySheetApp(mon_html).render(true);
}

  static partysheetButton = () => {
      console.log('Coucou tu es là !');
          if (!game.user.isGM && !Actor.canUserCreate(game.user)) {
              return;
          }

          let partySheetButton = document.getElementById("PartySheet-button");
          if (partySheetButton != null) {
              return;
          }

          const actorsPanel = document.getElementById("actors");
          const actorFooter = actorsPanel.getElementsByClassName("directory-footer")[0];
          if (actorFooter) {
              //SBUtils.log("Creating Statblock Parse button.");

              partySheetButton = document.createElement("button");
              partySheetButton.innerHTML = `<i id="PartySheet-button" class="fas fa-address-card"></i>Party Sheet`;
              partySheetButton.onclick = ev => PartySheet.openPartySheet();//console.log('tu as cliké');

              const createEntityButton = actorFooter.getElementsByClassName("create-entity")[0];
              actorFooter.insertBefore(partySheetButton, createEntityButton);
          }
  }

  static prepareData = () => {
    let listeActeur = [];
    game.actors.forEach(actor => {
      if (actor.data.type === "character") {
        listeActeur.push(actor.data.data.abilities);
      }
    })
    return listeActeur;
  }
}

//Crochet qui permet de créer et d'afficher le bouton de Party Sheet
Hooks.on("renderSidebarTab", async (app, html) => {
    if (app.options.id == "actors") {
        PartySheet.partysheetButton();
    }
});
