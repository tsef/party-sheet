export class PartySheetApp extends FormApplication {
    constructor(options) {
      super(options);
      this.mon_html = options;
      //this.exampleOption = exampleOption;
    }
  
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        height: 720,
        width: 800,
        //classes: ['form'],
        popOut: true,
        //template: `modules/party-sheet/html-templates/test_template.html`,
        //template: this.mon_html,
        //html: this.mon_html,
        id: 'my-form-application',
        title: 'My FormApplication',
      });
    }
  
    getData(options = {}) {
      // Send data to the template
      /*return {
        msg: this.exampleOption,
        color: 'red',
      };*/
      return super.getData().object;
    }
  
    activateListeners(html) {
      super.activateListeners(html);
    }
  
    async _updateObject(event, formData) {
      console.log(formData.exampleInput);
    }
  }