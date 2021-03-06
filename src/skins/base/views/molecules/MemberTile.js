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

var sdk = require('matrix-react-sdk');
var MatrixClientPeg = require("matrix-react-sdk/lib/MatrixClientPeg");
var MemberTileController = require("matrix-react-sdk/lib/controllers/molecules/MemberTile");

// The Lato WOFF doesn't include sensible combining diacritics, so Chrome chokes on rendering them.
// Revert to Arial when this happens, which on OSX works at least.
var zalgo = /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/;

module.exports = React.createClass({
    displayName: 'MemberTile',
    mixins: [MemberTileController],

    render: function() {
        var MemberInfo = sdk.getComponent('molecules.MemberInfo');
        var MemberAvatar = sdk.getComponent('atoms.MemberAvatar');

        var isMyUser = MatrixClientPeg.get().credentials.userId == this.props.member.userId;

        var presenceClass = "mx_MemberTile_offline";
        var mainClassName = "mx_MemberTile ";
        if (this.props.member.user) {
            if (this.props.member.user.presence === "online") {
                presenceClass = "mx_MemberTile_online";
            }
            else if (this.props.member.user.presence === "unavailable") {
                presenceClass = "mx_MemberTile_unavailable";
            }
        }
        mainClassName += presenceClass;

        var name = this.props.member.name;
        if (isMyUser) name += " (me)";
        var leave = isMyUser ? <span className="mx_MemberTile_leave" onClick={this.onLeaveClick}>X</span> : null;

        var nameClass = this.state.hover ? "mx_MemberTile_nameSpan" : "mx_MemberTile_name";
        if (zalgo.test(name)) {
            nameClass += " mx_MemberTile_zalgo";
        }

        var nameEl;
        if (this.state.hover) {
            nameEl =
                <div className="mx_MemberTile_nameWrapper">
                    <MemberInfo member={this.props.member} />
                    <span className={nameClass}>{name}</span>
                    {leave}
                </div>
        }
        else {
            nameEl =
                <div className={nameClass}>
                    {name}
                    {leave}
                </div>
        }

        return (
            <div className={mainClassName} onMouseEnter={ this.mouseEnter } onMouseLeave={ this.mouseLeave }>
                <div className="mx_MemberTile_avatar">
                    <MemberAvatar member={this.props.member} />
                </div>
                { nameEl }
            </div>
        );
    }
});
