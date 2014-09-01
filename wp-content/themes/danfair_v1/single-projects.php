<?php 
    get_header();
    the_post();
?>
    <section class="page-sub-header project-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1><?php the_title(); ?></h1>
        </div>
    </section>
    
    <section class="page-content project-section">
        <div class="content-wrapper max-width-wrapper">
            <div class="page-content__content-left">
                <h2>Project Summary</h2>
                <?php the_field('project-summary'); ?>
                <h3>Technology Used</h3>
                <?php the_field('technology-used'); ?>
                <h3>Lessons learned</h3>
                <?php the_field('lessons-learned'); ?>
            </div>
            <aside class="sidebar">
                <h4>Images</h4>
                <?php
                    if (has_post_thumbnail()) {
                        echo '<ul class="project-images-list"><li><div class="project-image-list__overlay"></div>';
                        the_post_thumbnail();
                        echo '</li>';
                    }
                    if (get_field('image-1')) :
                ?>
                    <li><div class="project-image-list__overlay"></div><img class="project-preview-image" src="<?php the_field('image-1'); ?>"></li>
                <?php endif;

                    if (get_field('image-2')) :
                ?>
                    <li><div class="project-image-list__overlay"></div><img class="project-preview-image" src="<?php the_field('image-2'); ?>"></li>
                <?php endif;

                    if (get_field('image-3')) :
                ?>
                    <li><div class="project-image-list__overlay"></div><img class="project-preview-image" src="<?php the_field('image-3'); ?>"></li>
                <?php endif;
                if (has_post_thumbnail()) {
                    echo '</ul>';
                } ?>

                <a href="<?php the_field('live-project-link') ?>" class="btn btn--orange">See live project<div class="btn__arrow black right"></div></a>
                    <a href="<?php the_field('github-link'); ?>" class="btn btn--orange">View on GitHub<div class="btn__arrow btn__github-logo"></div></a>
            </aside>
        </div>
    </section>
<?php get_footer(); ?>