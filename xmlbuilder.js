const builder = require('xmlbuilder');
const fs = require('fs')

module.exports = {
    build: (arr, league, team, path) => {
        var root = builder.create('record');
        //<boolean id="preload" value="false"/>
        var bool = root.ele('boolean');
        bool.att("id", "preload")
        bool.att("value", false)
        //<boolean id="amap" value="false"/>
        var map = root.ele('amap');
        map.att("id", "amap")
        map.att("value", false)
        //<record from="8169215" to="graphics/pictures/person/8169215/portrait"/>
        root.com('list of faces added by Brockor');
        var list = root.ele('list');
        list.att("id", "maps")
        for(var i = 0; i < arr.length; i++){
            var item = list.ele('record');
            item.att('from', arr[i]);
            item.att('to', `graphics/pictures/person/${arr[i]}/portrait`);
        }
        
        var xml = root.end({ pretty: true});
        fs.writeFile(`${path}/${league}/${team}/config.xml`, xml, function (err){
            if (err) throw err;
                console.log(`XML File for ${team} has been created!`);
        }); 
    }
}