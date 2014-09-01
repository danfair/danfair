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