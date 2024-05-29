package ndhu.tw.MaasService.service;
import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.db.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserInfoRepository userInfoRepository;

    public UserService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public List<UserInfo> allUsers() {
        List<UserInfo> users = new ArrayList<>();

        userInfoRepository.findAll().forEach(users::add);

        return users;
    }
}