/*
Copyright 2015 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var React = require('react');

var MemberListController = require('matrix-react-sdk/lib/controllers/organisms/MemberList');

var ComponentBroker = require('matrix-react-sdk/lib/ComponentBroker');

var MemberTile = ComponentBroker.get("molecules/MemberTile");


module.exports = React.createClass({
    displayName: 'MemberList',
    mixins: [MemberListController],

    makeMemberTiles: function() {
        var that = this;
        return Object.keys(that.state.memberDict).map(function(userId) {
            var m = that.state.memberDict[userId];
            return (
                <li key={userId}>
                <MemberTile
                    member={m}
                />
                </li>
            );
        });
    },

    render: function() {
        return (
            <div className="mx_MemberList">
                <ul>
                    {this.makeMemberTiles()}
                </ul>
            </div>
        );
    }
});
