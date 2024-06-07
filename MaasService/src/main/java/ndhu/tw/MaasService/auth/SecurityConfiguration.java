package ndhu.tw.MaasService.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/*
* 定義安全規則
* */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/v3/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/rest-api-docs/**")).permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(new CorsFilterConfig(), ChannelProcessingFilter.class)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//        http.addFilterBefore(new CorsFilterConfig(), ChannelProcessingFilter.class);
        return http.build();
    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
////        CorsConfiguration configuration = new CorsConfiguration();
//
////        configuration.setAllowedOrigins(List.of("http://localhost:8005"));
////        configuration.setAllowedOrigins(Arrays.asList(
////                "http://localhost:8005",
////                "http://134.208.97.247:7001/",
////                "http://127.0.0.1:7001/",
////                "http://134.208.97.247:7000/",
////                "http://127.0.0.1:7000/"
////        ));
////        configuration.setAllowedMethods(List.of("GET","POST"));
////        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));
//
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////
////        source.registerCorsConfiguration("/**",configuration);
//
//        // v2
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        CorsConfiguration config = new CorsConfiguration();
////        config.setAllowCredentials(true); // 允許帶有認證信息的請求
////        config.addAllowedOrigin("http://134.208.97.247:7001"); // 允許的來源
////        config.addAllowedHeader("*"); // 允許所有標頭
////        config.addAllowedMethod("*"); // 允許所有方法
////        source.registerCorsConfiguration("/**", config);
//
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(false); // 不允许带有认证信息的请求
//        config.addAllowedOrigin("*"); // 允许所有来源
//        config.addAllowedHeader("*"); // 允许所有标头
//        config.addAllowedMethod("*"); // 允许所有方法
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/**","/authority/**","/swagger-ui/**/","/control/**","rest-api-docs");
//        return (web) -> web.ignoring().requestMatchers("app/**")
//                .requestMatchers("/swagger-ui/**")
//                .requestMatchers("/rest-api-docs/**")
//                .requestMatchers("swagger-ui/**/").requestMatchers("swagger-ui/**/**/");
    }
}
