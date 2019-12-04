package com.FLAG_camp.google_search_daily.resource;

import java.io.IOException;
import java.util.Map;

import com.FLAG_camp.google_search_daily.service.RawDBDemoGeoIPLocationService;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class IpResource {

    @Autowired
    private RawDBDemoGeoIPLocationService locationService;


    @RequestMapping(path = "/GeoIPTest",  method = POST)
    public Map<String,String> getLocation(@RequestParam(value="ipAddress", required=true) String ipAddress) throws IOException, GeoIp2Exception {
        return locationService.getLocation(ipAddress);
    }
}
