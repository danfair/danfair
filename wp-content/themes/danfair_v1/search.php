<?php 
    update_option('current_page_template','search-page');  // get id for <body>
    get_header();
?>
    <section class="page-sub-header project-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1>SEARCH</h1>
        </div>
    </section>
    <section class="page-content search-section">
        <div class="content-wrapper max-width-wrapper">
            <div class="page-content__content-left">
    <?php 
        if (have_posts()) : while (have_posts()) : the_post(); 
        ?>
        <h3><?php the_title(); ?></h3>
        <p><?php the_content(); ?></p>
        <a href="<?php the_permalink(); ?>">Read</a>
    <?php endwhile; endif; wp_reset_query(); ?>
            </div>
            <aside class="sidebar">
                <h4>Search</h4>
                <?php get_search_form(); ?>
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
            </aside>
        </div>
    </section>

<?php get_footer(); ?>