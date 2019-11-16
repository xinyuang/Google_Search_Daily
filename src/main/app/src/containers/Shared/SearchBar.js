import React, {Component} from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

class SerachBar extends Component {
    state = {
        dataSource: [],
    };

    handleSearch = (value) => {
        console.log("key -word", value);
        // this.setState({
        //     dataSource: !value ?
        //         [] : nba.searchPlayers(value).map(player => ({
        //             fullName: player.fullName,
        //             playerId: player.playerId,
        //         }))
        // });
    }
    onSelect = (playerName) => {
        // this.props.handleSelectPlayer(playerName);
    }
    render() {
        const { dataSource } = this.state;
        const options = dataSource;
        //     .map((player) => (
        //     <Option key={player.fullName} value={player.fullName}          className="player-option">
        //         <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
        //         <span className="player-option-label">{player.fullName}</span>
        //     </Option>
        // ));

        return (
            <AutoComplete
                className="searchBar"
                size="large"
                dataSource={options}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search News"
                optionLabelProp="text"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />

            </AutoComplete>
        );
    }
}

export default SerachBar;