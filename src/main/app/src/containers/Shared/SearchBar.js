import React, {Component} from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

class SerachBar extends Component {
    state = {
        dataSource: [
            {
                title: "Business",
                icon: "shopping",
                src: "https://content.thriveglobal.com/wp-content/uploads/2019/07/Dream-Side-Business-Desk.jpg?w=1550"
            },
            {
                title: "Entertainment",
                icon: "interaction",
                src: "https://www.eventmanagerblog.com/wp-content/uploads/2018/10/350x215-FEAT-in-post-Entertainment.jpg"
            },
            {
                title: "Health",
                icon: "heart",
                src: "https://d362armbx6l2g0.cloudfront.net/d362armbx6l2g0_cloudfront_net/Video-Poster/promo_newslettersignup_2x_f2756ffb5c172d269067ce311945acea.png"
            },
            {
                title: "Politics",
                icon: "heart",
                src: "https://www.voicesofyouth.org/sites/default/files/images/2019-01/politics3.jpg"
            },
            {
                title: "ScienceAndTechnology",
                icon: "appstore",
                src: "https://i.cbc.ca/1.4833630.1537555507!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/global-internet-abstract.jpg"
            },
            {
                title: "Sports",
                icon: "dingding",
                src: "https://blog.studocu.com/wp-content/uploads/2016/10/slide1-image-tablet.png"
            },
            {
                title: "World",
                icon: "interaction",
                src: "https://www.clayton.edu/international-student-services/Forms/images/intern636634593552534916.jpeg"
            },
            {
                title: "US",
                icon: "shopping",
                src: "https://www.cmsschicago.org/wp-content/uploads/2018/11/US-News-and-World-Report.png"
            }
        ],
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
    onSelect = (NewsCategory) => {
        // this.props.handleSelectPlayer(NewsCategory);
    }

    render() {
        const { dataSource } = this.state;
        const options = dataSource
            .map((NewsCategory) => (
            <Option key={NewsCategory.title} value={NewsCategory.title}          className="player-option">
                <img className="news-option-image" src={NewsCategory.src}/>
                <span className="news-option-label">{NewsCategory.title}</span>
            </Option>
        ));

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
            <Input  onKeyDown={ e => {
                    if(e.key === 'Enter') {
                        console.log(e.target.value)
                    }

                }} suffix={<Icon type="search" className="certain-category-icon" />} />

            </AutoComplete>
        );
    }
}

export default SerachBar;