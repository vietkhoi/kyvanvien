package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.ChapterDTO;
import org.example.api.dto.StoryDTO;
import org.example.api.entity.*;
import org.example.api.mapper.ChapterMapper;
import org.example.api.mapper.StoryMapper;
import org.example.api.repository.*;
import org.example.api.util.SlugGenerator;
import org.example.api.util.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;

    private final UserRepository userRepository;

    private final GenreRepository genreRepository;

    private final StatusstoryRepository statusstoryRepository;

    private final TypeRepository typeRepository;

    private final ChapterRepository chapterRepository;

    private final RatingRepository ratingRepository;

    private final ViewRepository viewRepository;
    private final UserLikeRepository userLikeRepository;

    public List<StoryDTO> fetchAllStories() {
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Direction.DESC, "id"));

        List<Story> stories = storyRepository.findAll(pageable).getContent();

        return stories.stream()
                .map(story -> {
                    // Đếm số chương cho mỗi story
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }

    public StoryDTO getStoryById(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));

        // Đếm số lượng chương liên quan đến story này
        Long chapterCount = chapterRepository.countByStoryId(id);

        Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
        Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
        Long viewCount = viewRepository.countByStoryId(story.getId());

        averageRating = (averageRating != null) ? averageRating : 0.0;
        Long likeCount = userLikeRepository.countByStoryId(story.getId());

        // Map Story thành StoryDTO và set số lượng chương
        StoryDTO storyDTO = StoryMapper.toDTO(story);
        storyDTO.setChapterCount(chapterCount);  // Giả sử bạn đã thêm trường chapterCount vào StoryDTO
        storyDTO.setLikeCount(likeCount);
        storyDTO.setRatingCount(ratingCount);
        storyDTO.setAverageRating(averageRating);
        storyDTO.setViewCount(viewCount);

        return storyDTO;
    }

    public StoryDTO createStory(StoryDTO storyDTO) {
        // Tìm các thực thể liên quan dựa trên ID
        User user = userRepository.findById(storyDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + storyDTO.getUserId()));

        Genre genre = genreRepository.findById(storyDTO.getGenreId())
                .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + storyDTO.getGenreId()));

        Statusstory statusstory = statusstoryRepository.findById(storyDTO.getStatusId())
                .orElseThrow(() -> new RuntimeException("Status not found with ID: " + storyDTO.getStatusId()));

        Type type = typeRepository.findById(storyDTO.getTypeId())
                .orElseThrow(() -> new RuntimeException("Type not found with ID: " + storyDTO.getTypeId()));

        // Chuyển đổi StoryDTO thành Story entity
        Story story = StoryMapper.toEntity(storyDTO);
        String slug = SlugGenerator.toSlug(story.getTitle());
        story.setSlug(slug);
        // Thiết lập các mối quan hệ
        story.setUser(user);
        story.setGenre(genre);
        story.setStatus(statusstory);
        story.setType(type);

        // Lưu Story vào cơ sở dữ liệu
        story = storyRepository.save(story);

        // Chuyển đổi Story entity thành StoryDTO và trả về
        return StoryMapper.toDTO(story);
    }

    public StoryDTO updateStory(Long id, StoryDTO storyDTO) {
        Story existingStory = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));

        existingStory.setStoryImg(storyDTO.getStoryImg());
        existingStory.setTitle(storyDTO.getTitle());
        existingStory.setDescription(storyDTO.getDescription());
        existingStory.setAuthor(storyDTO.getAuthor());
        // Cập nhật các thuộc tính khác nếu cần
        if (storyDTO.getUserId() != null) {
            User user = userRepository.findById(storyDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + storyDTO.getUserId()));
            existingStory.setUser(user);
        }

        if (storyDTO.getGenreId() != null) {
            Genre genre = genreRepository.findById(storyDTO.getGenreId())
                    .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + storyDTO.getGenreId()));
            existingStory.setGenre(genre);
        }

        if (storyDTO.getStatusId() != null) {
            Statusstory statusstory = statusstoryRepository.findById(storyDTO.getStatusId())
                    .orElseThrow(() -> new RuntimeException("Status not found with ID: " + storyDTO.getStatusId()));
            existingStory.setStatus(statusstory);
        }

        if (storyDTO.getTypeId() != null) {
            Type type = typeRepository.findById(storyDTO.getTypeId())
                    .orElseThrow(() -> new RuntimeException("Type not found with ID: " + storyDTO.getTypeId()));
            existingStory.setType(type);
        }

//        String slug = SlugGenerator.toSlug(storyDTO.getTitle());
//        existingStory.setSlug(slug);

        existingStory.setSlug(storyDTO.getSlug());

        // Cập nhật các thuộc tính thời gian nếu cần
        existingStory.setUpdatedAt(new Date());

        // Lưu đối tượng Story đã được cập nhật vào cơ sở dữ liệu
        Story updatedStory = storyRepository.save(existingStory);

        // Chuyển đổi đối tượng Story thành StoryDTO và trả về
        return StoryMapper.toDTO(updatedStory);
    }

    public void deleteStory(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with ID: " + id));
        storyRepository.delete(story);
    }

//    public List<StoryDTO> searchStories(String query) {
//        // Chuẩn hóa chuỗi tìm kiếm: loại bỏ dấu và chuyển sang chữ thường
//        String normalizedQuery = StringUtils.removeDiacritics(query).toLowerCase();
//
//        // Lấy tất cả các story và lọc theo tiêu chí tìm kiếm đã chuẩn hóa
//        List<Story> stories = storyRepository.findAll().stream()
//                .filter(story -> {
//                    String normalizedTitle = StringUtils.removeDiacritics(story.getTitle()).toLowerCase();
//                    String normalizedAuthor = StringUtils.removeDiacritics(story.getAuthor()).toLowerCase();
//                    return normalizedTitle.contains(normalizedQuery) || normalizedAuthor.contains(normalizedQuery);
//                })
//                .collect(Collectors.toList());
//
//        // Chuyển đổi danh sách Story entities thành StoryDTOs
//        return stories.stream()
//                .map(StoryMapper::toDTO) // Sử dụng phương thức static
//                .collect(Collectors.toList());
//    }
public List<StoryDTO> searchStories(String query) {
    // Chuẩn hóa chuỗi tìm kiếm: loại bỏ dấu và chuyển sang chữ thường
    String normalizedQuery = StringUtils.removeDiacritics(query).toLowerCase();

    // Lấy tất cả các story và lọc theo tiêu chí tìm kiếm đã chuẩn hóa
    List<Story> stories = storyRepository.findAll().stream()
            .filter(story -> {
                String normalizedTitle = StringUtils.removeDiacritics(story.getTitle()).toLowerCase();
                String normalizedAuthor = StringUtils.removeDiacritics(story.getAuthor()).toLowerCase();
                return normalizedTitle.contains(normalizedQuery) || normalizedAuthor.contains(normalizedQuery);
            })
            .collect(Collectors.toList());

    // Chuyển đổi danh sách Story entities thành StoryDTOs với chapterCount
    return stories.stream()
            .map(story -> {
//                Long chapterCount = chapterRepository.countByStoryId(story.getId()); // Đếm số chương
                return StoryMapper.toDTO(story); // Sử dụng phương thức static với chapterCount
            })
            .collect(Collectors.toList());
}


    public List<StoryDTO> filterStories(Long typeId, Long genreId, Long statusId, String sortBy) {
        List<Story> stories = storyRepository.findByTypeGenreStatus(typeId, genreId, statusId);

        // Lấy chapter mới nhất cho từng truyện
        Map<Long, Chapter> latestChapterMap = new HashMap<>();
        for (Story story : stories) {
            Chapter latestChapter = chapterRepository.findTopByStoryIdOrderByCreatedAtDesc(story.getId());
            latestChapterMap.put(story.getId(), latestChapter);
        }

        // Lấy số lượt xem cho mỗi câu chuyện
        Map<Long, Long> viewCounts = stories.stream()
                .collect(Collectors.toMap(
                        Story::getId,
                        story -> viewRepository.countByStoryId(story.getId())
                ));

        // Sắp xếp danh sách câu chuyện theo tiêu chí
        if ("viewCount".equals(sortBy)) {
            stories.sort((s1, s2) -> Long.compare(viewCounts.get(s2.getId()), viewCounts.get(s1.getId())));
        } else if ("createdAt".equals(sortBy)) {
            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
        } else if ("lastChapter".equals(sortBy)) {
            stories.sort((s1, s2) -> {
                try {
                    Chapter c1 = latestChapterMap.get(s1.getId());
                    Chapter c2 = latestChapterMap.get(s2.getId());

                    // Kiểm tra nếu chapter là null
                    if (c1 == null && c2 == null) return 0;
                    if (c1 == null) return 1; // Nếu c1 không có chapter mới nhất, sắp sau c2
                    if (c2 == null) return -1; // Nếu c2 không có chapter mới nhất, sắp sau c1

                    // Kiểm tra nếu createdAt là null
                    Date c1CreatedAt = c1.getCreatedAt();
                    Date c2CreatedAt = c2.getCreatedAt();
                    if (c1CreatedAt == null && c2CreatedAt == null) return 0;
                    if (c1CreatedAt == null) return 1; // Nếu c1 không có createdAt, sắp sau c2
                    if (c2CreatedAt == null) return -1; // Nếu c2 không có createdAt, sắp sau c1

                    return c2CreatedAt.compareTo(c1CreatedAt);
                } catch (Exception e) {
                    // Log lỗi và xử lý ngoại lệ nếu cần
                    e.printStackTrace();
                    // Xử lý ngoại lệ theo yêu cầu của ứng dụng
                    return 0; // Hoặc giá trị mặc định khác
                }
            });
        }
        else {
            // Sắp xếp theo createdAt (hoặc giá trị mặc định)
            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
        }

        // Chuyển đổi danh sách câu chuyện thành danh sách StoryDTO
        return stories.stream()
                .map(story -> {
                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
                    Long viewCount = viewRepository.countByStoryId(story.getId());
                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
                    averageRating = (averageRating != null) ? averageRating : 0.0;
                    Long likeCount = userLikeRepository.countByStoryId(story.getId());

                    StoryDTO storyDTO = StoryMapper.toDTO(story);
                    storyDTO.setChapterCount(chapterCount);
                    storyDTO.setLikeCount(likeCount);
                    storyDTO.setRatingCount(ratingCount);
                    storyDTO.setAverageRating(averageRating);
                    storyDTO.setViewCount(viewCount);
                    return storyDTO;
                })
                .collect(Collectors.toList());
    }


//    public List<StoryDTO> filterStories(Long typeId, Long genreId, Long statusId, String sortBy) {
//        // Lấy danh sách truyện từ repository
//        List<Story> stories = storyRepository.findByTypeGenreStatus(typeId, genreId, statusId);
//
//        // Tạo danh sách lưu trữ chapter mới nhất cho mỗi truyện
//        Map<Long, Chapter> latestChapterMap = new HashMap<>();
//
//        // Lấy chapter mới nhất cho từng truyện
//        for (Story story : stories) {
//            Chapter latestChapter = chapterRepository.findTopByStoryIdOrderByCreatedAtDesc(story.getId());
//            latestChapterMap.put(story.getId(), latestChapter);
//        }
//
//        // Sắp xếp truyện dựa trên sortBy
//        if ("lastChapter".equals(sortBy)) {
//            stories.sort((s1, s2) -> {
//                Chapter c1 = latestChapterMap.get(s1.getId());
//                Chapter c2 = latestChapterMap.get(s2.getId());
//                if (c1 == null || c2 == null) return 0;
//                return c2.getCreatedAt().compareTo(c1.getCreatedAt());
//            });
//        } else if ("viewCount".equals(sortBy)) {
//            stories.sort((s1, s2) -> Long.compare(viewRepository.countByStoryId(s2.getId()), viewRepository.countByStoryId(s1.getId())));
//        }else if ("createdAt".equals(sortBy)) {
//            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
//        } else {
//            stories.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
//        }
//
//        return stories.stream()
//                .map(story -> {
//                    Long chapterCount = chapterRepository.countByStoryId(story.getId());
//                    Long viewCount = viewRepository.countByStoryId(story.getId());
//                    Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
//                    Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
//                    averageRating = (averageRating != null) ? averageRating : 0.0;
//                    Long likeCount = userLikeRepository.countByStoryId(story.getId());
//
//                    StoryDTO storyDTO = StoryMapper.toDTO(story);
//                    storyDTO.setChapterCount(chapterCount);
//                    storyDTO.setLikeCount(likeCount);
//                    storyDTO.setRatingCount(ratingCount);
//                    storyDTO.setAverageRating(averageRating);
//                    storyDTO.setViewCount(viewCount);
//                    return storyDTO;
//                })
//                .collect(Collectors.toList());
//    }



    public List<ChapterDTO> getChaptersByStoryId(Long storyId) {
        List<Chapter> chapters = chapterRepository.findByStoryId(storyId);
        return chapters.stream()
                .map(ChapterMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StoryDTO getStoryBySlug(String slug) {
        Story story = storyRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Story not found with slug: " + slug));

        Long chapterCount = chapterRepository.countByStoryId(story.getId()); // Đếm số chương
        Long viewCount = viewRepository.countByStoryId(story.getId());
        Long likeCount = userLikeRepository.countByStoryId(story.getId());
        Long ratingCount = ratingRepository.countRatingsByStoryId(story.getId());
        Double averageRating = ratingRepository.averageRatingByStoryId(story.getId());
        averageRating = (averageRating != null) ? averageRating : 0.0;

        StoryDTO storyDTO = StoryMapper.toDTO(story);
        storyDTO.setChapterCount(chapterCount);
        storyDTO.setRatingCount(ratingCount);
        storyDTO.setAverageRating(averageRating);
        storyDTO.setViewCount(viewCount);
        storyDTO.setLikeCount(likeCount);

        return storyDTO; // Truyền thêm chapterCount vào phương thức toDTO
    }
}
