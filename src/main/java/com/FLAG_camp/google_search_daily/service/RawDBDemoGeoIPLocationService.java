package com.FLAG_camp.google_search_daily.service;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;


//import com.FLAG_camp.google_search_daily.model.GeoIP;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import org.springframework.stereotype.Service;




@Service("RawDBDemoGeoIPLocationService")
public class RawDBDemoGeoIPLocationService {

    public Map<String,String> getLocation(String ip)
            throws IOException, GeoIp2Exception {
        File database = new File("/home/wilson/xj/Google_Search_Daily/GeoLite2-City.mmdb");
        DatabaseReader dbReader = new DatabaseReader.Builder(database).build();
        InetAddress ipAddress = InetAddress.getByName(ip);
        CityResponse response = dbReader.city(ipAddress);

        String cityName = response.getCity().getName();
        String latitude =
                response.getLocation().getLatitude().toString();
        String longitude =
                response.getLocation().getLongitude().toString();
        Map<String,String> map = new HashMap<>();
        map.put("ipAddress:",ip);
        map.put("cityName:",cityName);
        map.put("latitude:",latitude);
        map.put("longitude:",longitude);
        return map;
    }
}