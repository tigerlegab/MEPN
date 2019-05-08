/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        paper-input {
          flex: 1;
        }

        paper-button {
          height: 32px;
          font-size: 12px;
          font-weight: 400;
          background-color:  var(--paper-blue-800);
          color: white;
          text-transform: none;
          padding: 16px 36px;
          margin-top: 22px; 
          margin-left: 16px;
        }

        li:hover {
          cursor: pointer;
          color: var(--primary-color);
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>Todos</h1>
        <div style="display: flex;">
          <paper-input value="{{todo}}" label="New Todo" placeholder="- what to do? -" always-float-label></paper-input>
          <paper-button on-tap="_addTodo">Add</paper-button>
        </div>
        <div>
          <ol>
            <template is="dom-repeat" items="[[todos]]">
              <li on-click="_removeTodo">[[item.todo]]</li>
            </template>
          </ol>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      urlPath: String,
      todos: {
        type: Array,
        value: []
      }
    };
  }

  ready() {
    super.ready();
    this._fetchTodos();
  }

  _fetchTodos() {
    fetch(`${this.urlPath}todos/`).then(response => response.json())
      .then(data => {
        this.todos = data;
      })
      .catch(error => alert(error));
  }

  _addTodo() {
    if (this.todo) {
      fetch(`${this.urlPath}todos/`, {
        method: 'POST',
        body: JSON.stringify({ todo: this.todo }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => {
          this.todo = "";
          this._fetchTodos();
        })
        .catch(error => alert(error));
    }
  }

  _removeTodo(e) {
    fetch(`${this.urlPath}todos/${e.model.item._id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        this._fetchTodos();
      })
      .catch(error => alert(error));
  }
}

window.customElements.define('my-view1', MyView1);
