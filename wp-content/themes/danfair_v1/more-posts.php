<?php
    $pageNumber = $_POST['page_no'];
    $pageOffset = ($_POST['page_no'] - 1) * 5;

    $args = array(
        'posts_per_page' => '5',
        'post_type' => 'post', 
        'offset' => $pageOffset
    );
    $posts = new WP_Query($args);
    $isLastSet = ($posts->max_num_pages == $pageNumber ? true : false);
    if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post(); 
?>
<div class="blog-section__post <?php if ($isLastSet) echo 'last-set'; ?>">
    <h3><?php the_title(); ?></h3>
    <?php 
        if (has_post_thumbnail()) {
            the_post_thumbnail();
        };
        // WP only puts first date if 2+ posts are on the same day
        $date = get_the_date();
        echo "<h4>" . $date . "</h4>";

        the_content(); 
    ?>
        <a href="#" class="btn btn--orange blog-section__post__button page-<?php echo $pageNumber; ?>">See more<div class="btn__arrow black down"></div></a>
    <?php
        the_tags('<ul class="tags-list"><li class="tags-list__tag">','</li><li class="tags-list__tag">','</li></ul>');
    ?>
</div>
<?php endwhile; endif; wp_reset_query(); ?>