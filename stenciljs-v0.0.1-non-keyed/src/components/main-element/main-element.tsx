import { Component, State } from '@stencil/core';


interface DataItem {
  id?: number;
  label?: string;
}

var startTime;
var lastMeasure;

var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function() {
    window.setTimeout(function() {
        var stop = performance.now();
        console.log(lastMeasure+" took "+(stop-startTime));
    }, 0);
};


@Component({
  tag: 'main-element',
  styleUrl: 'main-element.scss'
})
export class MainElement {

    @State() data: Array<DataItem>;

    @State() selected: number;

    @State() did: number;
    
    constructor() {
        this.data = [];
        this.selected = null;
        this.did = 1;
    }
    
    render() {
        return (
        <div class="container">
                <div class="jumbotron">
                    <div class="row">
                        <div class="col-md-6">
                            <h1>StencilJS</h1>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="run" onClick={this.run.bind(this)}>Create 1,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="runlots" onClick={this.runLots.bind(this)}>Create 10,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="add" onClick={this.add.bind(this)}>Append 1,000 rows</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="update" onClick={this.update.bind(this)}>Update every 10th row</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="clear" onClick={this.clear.bind(this)}>Clear</button>
                                </div>
                                <div class="col-sm-6 smallpad">
                                    <button type="button" class="btn btn-primary btn-block" id="swapRows" onClick={this.swapRows.bind(this)}>Swap Rows</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-hover table-striped test-data">
                    <tbody>
                        {this.data.map( item => 
                            <tr class="{this.rowClass(item.id, this.selected)}">
                                <td class="col-md-1">{item.id}</td>
                                <td class="col-md-4">
                                    <a onClick={this.select.bind(this)}>{item.label}</a>
                                </td>
                                <td class="col-md-1"><a onClick={this.del.bind(this)}><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
                                <td class="col-md-6"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
        );
    }


    add() {
        startMeasure("add");
        this.data = this.data.concat(this.buildData(1000));
        stopMeasure();
    }

    run() {
        startMeasure("run");
        this.data = this.buildData(1000);
        stopMeasure();
    }

    runLots() {
        startMeasure("runLots");
        this.data = this.buildData(10000);
        stopMeasure();
    }

    clear() {
        startMeasure("clear");
        this.data = [];
        stopMeasure();
    }

    del(e) {
        startMeasure("delete");
        this.data.splice(e.model.index, 1);
        stopMeasure();
    }

    select(e) {
        startMeasure("select");
        this.selected = e.model.item.id;
        stopMeasure();
    }

    swapRows() {
        startMeasure("swapRows");
        if(this.data.length > 10) {
            var a = this.data[4];
            var b = this.data[9];
            this.data[9] = null;
            this.data[4] = b;
            this.data[9] = a;
        }
        stopMeasure();
    }

    update() {
        startMeasure("update");
        for (let i=0;i<this.data.length;i+=10) {
            this.data[i].label = (this.data[i].label + ' !!!');
        }    
        stopMeasure();
    }

    rowClass(id, selected) {
        return id == selected ? "danger" : null;
    }

    buildData(count) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++) {
            data.push({ id: this.did++, label: adjectives[this._random(adjectives.length)] + " " + colours[this._random(colours.length)] + " " + nouns[this._random(nouns.length)] });
        }
        return data;
    }

    _random(max) {
        return Math.round(Math.random() * 1000) % max;
    }
}
