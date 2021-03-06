<?php 
    update_option('current_page_template','blog-page');
    get_header();
    the_post();
?>
    <section class="page-sub-header blog-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1><?php the_title(); ?></h1>
        </div>
    </section>
    
    <section class="page-content blog-section">
        <div class="content-wrapper max-width-wrapper">
            <div class="page-content__content-left">
                <?php
                    $args = array(
                        'posts_per_page' => '5',
                        'post_type' => 'post', 
                    );
                    $posts = new WP_Query($args);
                    if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post(); 
                    $index = $posts->current_post + 1;
                    $maxPages = $posts->max_num_pages;
                ?>
                <div class="blog-section__post<?php if ($index == 1) {echo " latest-post";} ?>">
                    <h3<?php if ($index == 1) {echo " class='blog-section__first-header'";} ?>><?php the_title(); ?></h3>
                    <?php 
                        if (has_post_thumbnail()) {
                            the_post_thumbnail();
                        };
                        // WP only puts first date if 2+ posts are on the same day
                        $date = get_the_date();
                        echo "<h4 class='blog-section__post__date'>" . $date . "</h4>";

                        the_content();
                        if ($index != 1) : 
                    ?>
                        <a href="#" class="btn btn--orange blog-section__post__button">See more<div class="btn__arrow black down"></div></a>
                    <?php endif;
                        the_tags('<ul class="tags-list"><li class="tags-list__tag">','</li><li class="tags-list__tag">','</li></ul>');
                    ?>
                </div>
                <?php endwhile; endif; wp_reset_query(); ?>
                <?php if ($maxPages > 1) : ?>
                    <div class="blog-section__more-posts">
                        <a href="" class="btn btn--orange more-posts-btn">MORE POSTS<div class="btn__arrow black down"></div></a>
                        <img class="ajax-spinner" src="<?php bloginfo('template_directory'); ?>/img/ajax-spinner.gif" />
                    </div>
                <?php endif; ?>
            </div> 
            <aside class="sidebar">
                <div class="sidebar__search-form">
                    <h4>Search</h4>
                    <?php get_search_form(); ?>
                </div>
                <div class="sidebar__categories">
                    <h4>Popular categories</h4>
                    <?php 
                        $args = array(
                            'smallest'                  => 10, 
                            'largest'                   => 10,
                            'unit'                      => 'px', 
                            'number'                    => 15,  
                            'format'                    => 'list',
                            'separator'                 => "\n",
                            'orderby'                   => 'name', 
                            'order'                     => 'RAND',
                            'exclude'                   => null, 
                            'include'                   => null, 
                            'topic_count_text_callback' => default_topic_count_text,
                            'link'                      => 'view', 
                            'taxonomy'                  => 'post_tag', 
                            'echo'                      => true,
                            'child_of'                  => null
                        ); 

                        wp_tag_cloud($args);
                    ?>
                </div>
            </aside>
        </div>
    </section>
<?php get_footer(); ?>