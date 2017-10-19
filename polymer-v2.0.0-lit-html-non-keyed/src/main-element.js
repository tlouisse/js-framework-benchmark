import {html, render, svg} from '../lit-html.js';

/** 
 * Adapted from the Ractive.js clock example: http://www.ractivejs.org/examples/clock/
 */
export class MainElement extends HTMLElement {

  get date() { return this._date; }
  set date(v) { this._date = v; this.invalidate(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  render() {
    return html`
    <style include="shared-styles"></style>        
        <div class="container" >
            <div class="jumbotron">
                <div class="row">
                    <div class="col-md-6">
                        <h1>Polymer v2.0.0</h1>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="run" on-click="run">Create 1,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="runLots" on-click="runLots">Create 10,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary
                                btn-block" id="add" on-click="add">Append 1,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary
                                btn-block" id="update" on-click="update">Update every 10th row</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary
                                btn-block" id="clear" on-click="clear">Clear</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary
                                btn-block" id="swaprows" on-click="swapRows">Swap Rows</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-hover table-striped test-data">
                <tbody>
                    <template is="dom-repeat" items="[[data]]">
                        <tr class$="{{rowClass(item.id, selected)}}">
                            <td class="col-md-1">[[item.id]]</td>
                            <td class="col-md-4">
                                <a on-click="select">[[item.label]]</a>
                            </td>
                            <td class="col-md-1"><a on-click="del"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
                            <td class="col-md-6"></td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>
    `;
  }

  invalidate() {
    if (!this.needsRender) {
      this.needsRender = true;
      Promise.resolve().then(() => {
        this.needsRender = false;
        render(this.render(), this.shadowRoot);
      });
    }
  }




  
}
customElements.define('main-element', MainElement);
