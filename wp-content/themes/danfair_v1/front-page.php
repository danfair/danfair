<?php 
    get_header();
    the_post();
?>
    <section class="hero-area">
        <div class="parallax-bg hero-bg"></div>
            <nav class="max-width-wrapper main-nav front-page-nav display-none">
                <a href="<?php bloginfo('wpurl'); ?>"class="df-logo">DAN FAIR</a>
                <?php wp_nav_menu(); ?>
                <ul class="main-header__social-icons-list">
                    <li><a href="http://www.linkedin.com/in/danfair" class="social-icon linkedin"></a></li>
                    <li><a href="http://www.twitter.com/sdanfair" class="social-icon twitter"></a></li>
                    <li><a href="http://www.github.com/danfair" class="social-icon github"></a></li>
                </ul>
            </nav> 
            <div class="hero-area__text-container">
                <h1 class="white-text">DAN FAIR</h1>
                <?php the_content(); ?>
                <a href="#portfolio-section" class="btn btn--orange-white see-work-button">See my work<div class="btn__arrow white down bounce-down"></div></a>
            </div>

    </section><!-- end of hero-area -->
    <span id="portfolio"></span>
    <section id="portfolio-section" class="portfolio">
        <div class="portfolio__header-wrapper">
            <h2 class="max-width-wrapper">PORTFOLIO</h2>
        </div>
        <?php
            $args = array(
                'posts_per_page' => '-1',
                'post_type' => 'projects', 
            );
            $projects = new WP_Query($args);
            if ($projects->have_posts()) : while ($projects->have_posts()) : $projects->the_post(); 
        ?>
        <div class="portfolio__project">
            <div class="max-width-wrapper">
                <h3><?php the_title(); ?></h3>
                <div class="portfolio__project__thumbnail">
                    <?php if (has_post_thumbnail()) {
                        the_post_thumbnail();
                    } ?>
                </div>
                <div class="portfolio__project__text">
                    <?php 
                        $post_tags = get_the_tags();
                        if ($post_tags) {
                            echo "<ul class='tags-list'>";
                            foreach ($post_tags as $tag) {
                                echo "<li class='tags-list__tag'>" . $tag->name . "</li>";
                            }
                            echo "</ul>";
                        }
                        the_field('project-summary'); 
                    ?>
                    <div class="portfolio__project__buttons">
                        <a href="<?php the_permalink(); ?>" class="btn btn--orange portfolio__project__summary-link">See project summary<div class="btn__arrow black right"></div></a>
                        <a href="<?php the_field('github-link'); ?>" class="btn btn--orange portfolio__project__github-link">View on GitHub<div class="btn__arrow btn__github-logo"></div></a>
                    </div>
                </div>
                
            </div>
        </div>
        <?php endwhile; else: ?>
            <h3 class="coming-soon">Projects will be posted soon!</h3>
        <?php endif; wp_reset_query(); ?>
    </section><!-- end of portfolio section -->
<?php get_footer(); ?>