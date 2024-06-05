package ndhu.tw.MaasService.auth;

import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.db.repository.UserInfoRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ApplicationConfiguration {

    private final UserInfoRepository userInfoRepository;

    public ApplicationConfiguration(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    /*
    * 定義如何取得使用者
    * */
    @Bean
    UserDetailsService userDetailsService() {
        return username -> (UserInfo) userInfoRepository.findByAccount(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /*
     * 對密碼進行編碼
     * */
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    /*
     * 設定新規則來執行身份驗證
     * */
    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
