package com.travel_agent.resolver;

import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.travel_agent.repositories.UserRepository;
import com.travel_agent.annotation.CurrentUserId;
import com.travel_agent.dto.UserDTO;
import com.travel_agent.models.entity.UserEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;

@Component
@RequiredArgsConstructor

public class CurrentUserIdResolver implements HandlerMethodArgumentResolver {

    private final UserRepository userRepository; // service để lấy userId từ username

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(CurrentUserId.class) != null
               && parameter.getParameterType().equals(Integer.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws Exception {
        // Giả sử username được lưu trong SecurityContext (ví dụ từ JWT token)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);

        String username = authentication.getName();
        System.out.println(username);

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        System.out.println("Role: " + role);

        // Lấy userId từ username
        UserEntity user = userRepository.findByUsernameOrEmail(username).orElse(null);
        System.out.println("UserInfo: " + user);
        if (user == null) return null;
        return user.getUserId();
    }
}
