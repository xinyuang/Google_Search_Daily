package com.FLAG_camp.google_search_daily.resource;

import java.io.IOException;
import java.util.Map;

import com.FLAG_camp.google_search_daily.service.RawDBDemoGeoIPLocationService;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class IpResource {

    @Autowired
    private RawDBDemoGeoIPLocationService locationService;


    @PostMapping("/GeoIPTest")
    public Map<String,String> getLocation(@RequestParam(value="ipAddress", required=true) String ipAddress) throws IOException, GeoIp2Exception {
        return locationService.getLocation(ipAddress);
    }
}
