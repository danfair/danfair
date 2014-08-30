<?php 
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
                        'posts_per_page' => '-1',
                        'post_type' => 'post', 
                    );
                    $posts = new WP_Query($args);
                    if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post(); 
                    $index = $posts->current_post + 1;
                ?>
                <div class="blog-section__post">
                    <h3<?php if ($index == 1) {echo " class='blog-section__first-header'";} ?>><?php the_title(); ?></h3>
                    <?php 
                        if (has_post_thumbnail()) {
                            the_post_thumbnail();
                        };
                        the_content();
                        if ($index != 1) : ?>
                        <a href="#" class="btn btn--orange">See more<div class="btn__arrow black down"></div></a>
                    <? endif;
                        the_tags('<ul class="tags-list"><li class="tags-list__tag">','</li><li class="tags-list__tag">','</li></ul>');
                    ?>
                </div>
                <?php endwhile; endif; wp_reset_query(); 
                ?>
            </div> 
                <aside class="sidebar">
                    <h4>Search</h4>
                    <?php get_search_form(); ?>
                    <h4>Popular categories</h4>
                    <?php 
                        $args = array(
                            'smallest'                  => 12, 
                            'largest'                   => 12,
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
                </aside>
        </div>
    </section>
<?php get_footer(); ?>