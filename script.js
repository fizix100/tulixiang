// 全局配置变量
let resumeConfig = null;

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从HTML中读取配置数据
    loadConfigFromHTML().then(() => {
        // 渲染简历内容
        renderResume();
        
        // 添加滚动动画效果
        addScrollAnimations();
        
        // 添加技能标签的悬停效果
        addSkillHoverEffects();
        
        // 添加时间线动画
        addTimelineAnimations();
        
        // 添加打印功能
        addPrintFunctionality();
    }).catch(error => {
        console.error('加载配置数据失败:', error);
        // 如果配置数据加载失败，显示错误信息
        showErrorMessage();
    });
});

// 从HTML中读取配置数据
async function loadConfigFromHTML() {
    try {
        const configElement = document.getElementById('resume-config');
        if (!configElement) {
            throw new Error('未找到配置数据元素');
        }
        
        const configText = configElement.textContent.trim();
        resumeConfig = JSON.parse(configText);
        
        console.log('配置数据加载成功');
    } catch (error) {
        console.error('解析配置数据失败:', error);
        throw error;
    }
}

// 渲染简历内容
function renderResume() {
    if (!resumeConfig) return;
    
    // 渲染基本信息
    renderBasicInfo();
    
    // 渲染联系方式
    renderContactInfo();
    
    // 渲染工作经验
    renderExperience();
    
    // 渲染教育背景
    renderEducation();
    
    // 渲染技能
    renderSkills();
    
    // 渲染项目经验
    renderProjects();
    
    // 渲染额外技能
    renderAdditionalSkills();
    
    // 渲染证书荣誉
    renderCertificates();
    
    // 渲染自我评价
    renderSelfEvaluation();
    
    // 渲染底部版权信息
    renderFooter();
}

// 渲染基本信息
function renderBasicInfo() {
    const { basic } = resumeConfig;
    
    document.getElementById('name').textContent = basic.name;
    document.getElementById('title').textContent = basic.title;
    document.getElementById('summary').textContent = basic.summary;
}

// 渲染联系方式
function renderContactInfo() {
    const { contact } = resumeConfig;
    const contactContainer = document.getElementById('contact-info');
    
    const contactItems = [
        { icon: 'fas fa-envelope', text: contact.email },
        { icon: 'fas fa-phone', text: contact.phone },
        { icon: 'fas fa-map-marker-alt', text: contact.location },
        { icon: 'fab fa-linkedin', text: contact.linkedin }
    ];
    
    contactContainer.innerHTML = contactItems.map(item => `
        <div class="contact-item">
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        </div>
    `).join('');
}

// 渲染工作经验
function renderExperience() {
    const { experience } = resumeConfig;
    const timelineContainer = document.getElementById('experience-timeline');
    
    timelineContainer.innerHTML = experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-header">
                <h3>${exp.position}</h3>
                <span class="company">${exp.company}</span>
                <span class="period">${exp.period}</span>
            </div>
            <ul class="achievements">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// 渲染教育背景
function renderEducation() {
    const { education } = resumeConfig;
    const educationContainer = document.getElementById('education-item');
    
    educationContainer.innerHTML = `
        <div class="education-header">
            <h3>${education.major}</h3>
            <span class="degree">${education.degree}</span>
        </div>
        <p class="school">${education.school}</p>
        <p class="period">${education.period}</p>
        <p class="gpa">${education.gpa}</p>
    `;
}

// 渲染技能
function renderSkills() {
    const { skills } = resumeConfig;
    const skillsContainer = document.getElementById('skills-container');
    
    const skillCategories = [
        { title: '技术技能', skills: skills.technical },
        { title: '软技能', skills: skills.soft },
        { title: '语言能力', skills: skills.languages }
    ];
    
    skillsContainer.innerHTML = skillCategories.map(category => `
        <div class="skill-category">
            <h4>${category.title}</h4>
            <div class="skill-tags">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// 渲染项目经验
function renderProjects() {
    const { projects } = resumeConfig;
    const projectsContainer = document.getElementById('projects-container');
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-item">
            <h4>${project.name}</h4>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ${project.highlights ? `
                <div class="project-highlights">
                    <h5>技术亮点：</h5>
                    <ul>
                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// 渲染额外技能
function renderAdditionalSkills() {
    const { additional_skills } = resumeConfig;
    if (!additional_skills) return;
    
    const additionalSkillsContainer = document.getElementById('additional-skills');
    
    const skillCategories = [
        { title: '办公技能', skills: additional_skills.office },
        { title: '设计技能', skills: additional_skills.design }
    ];
    
    additionalSkillsContainer.innerHTML = skillCategories.map(category => `
        <div class="additional-skill-category">
            <h4>${category.title}</h4>
            <ul class="skill-list">
                ${category.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// 渲染证书荣誉
function renderCertificates() {
    const { certificates } = resumeConfig;
    const certificatesContainer = document.getElementById('certificates-container');
    
    certificatesContainer.innerHTML = certificates.map(cert => `
        <div class="certificate-item">
            <h4>${cert.name}</h4>
            <p>${cert.issuer}</p>
        </div>
    `).join('');
}

// 渲染自我评价
function renderSelfEvaluation() {
    const { self_evaluation } = resumeConfig;
    if (!self_evaluation) return;
    
    const selfEvaluationContainer = document.getElementById('self-evaluation');
    selfEvaluationContainer.innerHTML = `
        <div class="self-evaluation-content">
            <p>${self_evaluation}</p>
        </div>
    `;
}

// 渲染底部版权信息
function renderFooter() {
    const { footer } = resumeConfig;
    document.getElementById('footer-copyright').textContent = footer.copyright;
}

// 显示错误信息
function showErrorMessage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #666;">
            <h2>配置数据加载失败</h2>
            <p>请检查HTML文件中的配置数据格式是否正确。</p>
            <p>错误详情请查看浏览器控制台。</p>
        </div>
    `;
}

// 滚动动画效果
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.section, .timeline-item, .skill-tag, .project-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 技能标签悬停效果
function addSkillHoverEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// 时间线动画
function addTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// 打印功能
function addPrintFunctionality() {
    // 添加打印按钮（可选）
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印简历';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Noto Sans SC', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // 在小屏幕上隐藏打印按钮
    if (window.innerWidth <= 768) {
        printButton.style.display = 'none';
    }
}

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P 打印
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + S 保存为PDF（提示用户）
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        alert('请使用浏览器的"另存为"功能或打印为PDF来保存简历。');
    }
});

// 添加响应式处理
window.addEventListener('resize', function() {
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        if (window.innerWidth <= 768) {
            printButton.style.display = 'none';
        } else {
            printButton.style.display = 'block';
        }
    }
});

// 添加加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加技能进度条效果（可选功能）
function addSkillProgressBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skillTags = category.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            // 为每个技能标签添加延迟动画
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// 初始化技能进度条
addSkillProgressBars(); 