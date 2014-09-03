<div class="project-section__images-carousel__overlay"></div>
<div class="project-section__images-carousel">
<?php 
    $postId = $_POST['post_id'];
    $startAt = $_POST['start'];
    $args = array(
        'p' => $postId,
        'posts_per_page' => 1,
        'post_type' => 'projects'
    );
    $posts = new WP_Query($args);
    if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post(); 
    if (has_post_thumbnail()) {
        echo '<ul class="carousel-images-list"><li';
        if ($startAt == 0) { echo ' class="current"'; }
        echo '>';
        the_post_thumbnail();
        echo '</li>';
    } else { 
        echo '<ul class="carousel-images-list">';
    }

    if (get_field('image-1')) :
?>
    <li
    <?php
        if ($startAt == 1) { echo ' class="current"'; }
        echo '>';
    ?>
    <img src="<?php the_field('image-1'); ?>"></li>
<?php endif;

    if (get_field('image-2')) :
?>
    <li
    <?php
        if ($startAt == 2) { echo ' class="current"'; }
        echo '>';
    ?>
    <img src="<?php the_field('image-2'); ?>"></li>
<?php endif;

    if (get_field('image-3')) :
?>
    <li
    <?php
        if ($startAt == 3) { echo ' class="current"'; }
        echo '>';
    ?>
    <img src="<?php the_field('image-3'); ?>"></li>
<?php 
    endif; 
    echo '</ul>'; 
    endwhile; endif; wp_reset_query();
?>
<a href="" class="carousel-button previous"></a>
<a href="" class="carousel-button next"></a>
<a href="" class="carousel-exit"></a>
</div>
