<?php 
    get_header();
    the_post();
?>
    <section class="page-sub-header project-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1 data-post-id="<?php the_ID(); ?>"><?php the_title(); ?></h1>
        </div>
    </section>
    
    <section class="page-content project-section">
        <div class="content-wrapper max-width-wrapper">
            <h2>Project Summary</h2>
            <div class="page-content__content-left">  
                <?php the_field('project-summary'); ?>
                <h3>Technology Used</h3>
                <?php the_field('technology-used'); ?>
                <h3>Lessons learned</h3>
                <?php the_field('lessons-learned'); ?>
            </div>
            <aside class="sidebar">
                <?php
                    if (has_post_thumbnail()) {
                        echo '<ul class="project-images-list"><li><div class="project-images-list__overlay"></div><a href="" class="btn btn--white project-images-list__button project-preview-image" data-image-no="0">See photos<div class="btn__arrow white right"></div></a>';
                        the_post_thumbnail();
                        echo '</li>';
                    }
                    if (get_field('image-1')) :
                ?>
                    <li><a href="" class="project-preview-image" data-image-no="1"><div class="project-images-list__overlay"></div><img src="<?php the_field('image-1'); ?>"></a></li>
                <?php endif;
                    if (get_field('image-2')) :
                ?>
                    <li><a href="" class="project-preview-image" data-image-no="2"><div class="project-images-list__overlay"></div><img src="<?php the_field('image-2'); ?>"></a></li>
                <?php endif;
                    if (get_field('image-3')) :
                ?>
                    <li><a href="" class="project-preview-image" data-image-no="3"><div class="project-images-list__overlay"></div><img src="<?php the_field('image-3'); ?>"></a></li>
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