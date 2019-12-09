package com.FLAG_camp.google_search_daily.resource;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Map;
import static com.FLAG_camp.google_search_daily.SpringReactBoilerplateApplication.logger;
import com.FLAG_camp.google_search_daily.service.RawDBDemoGeoIPLocationService;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class IpResource {

    @Autowired
    private RawDBDemoGeoIPLocationService locationService;


    @RequestMapping(path = "/GeoIPTest", method = POST)
    public Map<String,String> getLocation(HttpServletRequest request) throws IOException, GeoIp2Exception {
        String ip = request.getRemoteAddr();
        if (ip.equalsIgnoreCase("0:0:0:0:0:0:0:1") || ip.equalsIgnoreCase("127.0.0.1")) {
            Enumeration en = NetworkInterface.getNetworkInterfaces();
            NetworkInterface ni=(NetworkInterface) en.nextElement();
            Enumeration ee = ni.getInetAddresses();
            while(ee.hasMoreElements()) {
                InetAddress ia = (InetAddress) ee.nextElement();
                ip = ia.getHostAddress();
                if(!ip.equals("127.0.0.1")) {
                    int idx = ip.indexOf('%');
                    ip = ip.substring(0, idx);
                    break;
                }
            }
        }
        return locationService.getLocation(ip);
    }
}
