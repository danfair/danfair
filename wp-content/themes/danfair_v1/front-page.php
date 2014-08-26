<?php 
    get_header();
    the_post();
?>
        <section class="hero-area">
            <div class="hero-area__text-container">
                <h1 class="white-text">DAN FAIR</h1>
                <?php the_content(); ?>
                <a href="#portfolio-section" class="btn btn--orange-white see-work-button">See my work<div class="btn__arrow white down bounce-down"></div></a>
            </div>
        </section>
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
                            the_content(); 
                        ?>
                        <a href="<?php the_permalink(); ?>" class="btn btn--orange">See project summary<div class="btn__arrow black right"></div></a>
                        <a href="<?php the_field('github-link'); ?>" class="btn btn--orange">View on GitHub<div class="btn__github-logo"></div></a>
                    </div>
                    <div class="portfolio__project__thumbnail">
                        <?php if (has_post_thumbnail()) {
                            the_post_thumbnail();
                        } ?>
                    </div>
                </div>
            </div>
            <?php endwhile; else: ?>
                <h3 class="coming-soon">Projects will be posted soon!</h3>
            <?php endif; wp_reset_query(); ?>
        </section>
    </body>
</html>
<?php get_footer(); ?>